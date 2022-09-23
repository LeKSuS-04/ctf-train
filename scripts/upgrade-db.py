import argparse
import bcrypt
import sqlite3
from dataclasses import astuple, dataclass
from datetime import datetime
from secrets import token_hex
from typing import TypeVar


parser = argparse.ArgumentParser(
    description='''Convert database from legacy version of MSHP-CTF to new one'''
)
parser.add_argument(
    '--input-db',
    '-i',
    dest='old_db_path',
    type=str,
    required=True,
    help=(
        'Path to the old database, from legacy version of MSHP-CTF. '
        'Script will read information from that database.'
    ),
)
parser.add_argument(
    '--output-db',
    '-o',
    dest='new_db_path',
    type=str,
    required=True,
    help=(
        'Path to the new database. Information from old database will be '
        'written here. New database must be empty and already initialized '
        'with `npx prisma migrate` command. '
    ),
)


@dataclass
class Base:
    @classmethod
    def from_db_entry(cls, db_entry: tuple):
        return cls(*db_entry)


@dataclass
class User(Base):
    id: int
    username: str
    hashed_password: str
    fio: str
    is_admin: bool

    @classmethod
    def from_db_entry(cls, db_entry: tuple):
        id, username, password, fio, *_ = db_entry
        salt = bcrypt.gensalt(rounds=10, prefix=b'2a')
        hashed_password = bcrypt.hashpw(password.encode(), salt).decode()
        return cls(id, username, hashed_password, fio, username == 'admin')


@dataclass
class Contest(Base):
    id: int
    name: str
    description: str
    is_active: bool

    @classmethod
    def from_db_entry(cls, db_entry):
        id, name, description, is_active = db_entry
        return cls(id, name, description, is_active)


@dataclass
class Task(Base):
    id: int
    name: str
    cost: int
    category: str
    description: str
    flag: str
    is_active: bool

    @classmethod
    def from_db_entry(cls, db_entry: tuple):
        id, name, cost, category, description, _, flag, is_active = db_entry
        flag = 'EMPTY_FLAG_' + token_hex(8) if flag is None else flag
        return cls(id, name, cost, category, description, flag, is_active)


@dataclass
class Group(Base):
    id: int
    name: str


@dataclass
class Solve(Base):
    user_id: int
    task_id: int
    time: datetime

    @classmethod
    def from_db_entry(cls, db_entry: tuple):
        _, user_id, task_id, time = db_entry
        return cls(user_id, task_id, datetime.strptime(time, '%Y-%m-%d %H:%M:%S'))


@dataclass
class GroupUser(Base):
    user_id: int
    group_id: int


@dataclass
class ContestTask(Base):
    contest_id: int
    task_id: int

    @classmethod
    def from_db_entry(cls, db_entry: tuple):
        _, contest_id, task_id = db_entry
        return cls(contest_id, task_id)


@dataclass
class Data:
    users: list[User]
    contests: list[Contest]
    tasks: list[Task]
    groups: list[Group]

    solves: list[Solve]
    groups_users: list[GroupUser]
    contests_tasks: list[ContestTask]


def read_old_data(path: str) -> Data:
    with sqlite3.connect(path) as conn:
        cur = conn.cursor()

        users_query = cur.execute('SELECT * FROM user').fetchall()
        users = [User.from_db_entry(entry) for entry in users_query]

        contests_query = cur.execute('SELECT * FROM contest').fetchall()
        contests = [Contest.from_db_entry(entry) for entry in contests_query]

        tasks_query = cur.execute('SELECT * FROM task').fetchall()
        tasks = [Task.from_db_entry(entry) for entry in tasks_query]

        groups_query = cur.execute('SELECT * FROM \'group\'').fetchall()
        groups = [Group.from_db_entry(entry) for entry in groups_query]

        solves_query = cur.execute('SELECT * FROM solved_task').fetchall()
        solves = [Solve.from_db_entry(entry) for entry in solves_query]

        groups_users_query = cur.execute('SELECT * FROM group_identifier').fetchall()
        groups_users = [GroupUser.from_db_entry(entry) for entry in groups_users_query]

        contests_tasks_query = cur.execute('SELECT * FROM contest_task').fetchall()
        contests_tasks = list(
            filter(
                lambda contest_task: contest_task.contest_id is not None,
                [ContestTask.from_db_entry(entry) for entry in contests_tasks_query],
            )
        )

    return Data(users, contests, tasks, groups, solves, groups_users, contests_tasks)


def write_data(data: Data, path: str):
    B = TypeVar('B', bound=Base)

    def to_db_entry(data_prop: list[B]) -> list[tuple]:
        return [astuple(entry) for entry in data_prop]

    with sqlite3.connect(path) as conn:
        cur = conn.cursor()

        cur.executemany(
            '''
            INSERT INTO users (id, username, password_hash, fio, is_admin)
            VALUES (?,?,?,?,?)
            ''',
            to_db_entry(data.users),
        )
        cur.executemany(
            '''
            INSERT INTO contests (id, name, description, is_active)
            VALUES (?,?,?,?)
            ''',
            to_db_entry(data.contests),
        )
        cur.executemany(
            '''
            INSERT INTO tasks (id, name, cost, category, description, flag, is_active)
            VALUES (?,?,?,?,?,?,?)
            ''',
            to_db_entry(data.tasks),
        )
        cur.executemany(
            '''
            INSERT INTO groups (id, name)
            VALUES (?,?)
            ''',
            to_db_entry(data.groups),
        )
        cur.executemany(
            '''
            INSERT INTO solves (user_id, task_id, time)
            VALUES (?,?,?)
            ''',
            to_db_entry(data.solves),
        )
        cur.executemany(
            '''
            INSERT INTO groups_users (user_id, group_id)
            VALUES (?, ?)
            ''',
            to_db_entry(data.groups_users),
        )
        cur.executemany(
            '''
            INSERT INTO contests_tasks (contest_id, task_id)
            VALUES (?,?)
            ''',
            to_db_entry(data.contests_tasks),
        )

        cur.connection.commit()


if __name__ == '__main__':
    args = parser.parse_args()
    new_conn = sqlite3.connect(args.new_db_path)

    data = read_old_data(args.old_db_path)
    write_data(data, args.new_db_path)
