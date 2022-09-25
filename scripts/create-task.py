import argparse
import sqlite3


new_task = dict(
    name='The task',
    cost=1000,
    category='Ucucuga',
    description='''
You know the rules and so do I
'''.strip(),
    flag='flag{thisisflag}',
    is_active=True,
)


parser = argparse.ArgumentParser(
    description='''Script used for task creation, before implementing web interface'''
)
parser.add_argument(
    '--database',
    '-d',
    dest='db_path',
    type=str,
    required=True,
    help=(
        'Path to the new database. Information from old database will be '
        'written here. New database must be empty and already initialized '
        'with `npx prisma migrate` command. '
    ),
)


def write_data(path: str):
    with sqlite3.connect(path) as conn:
        cur = conn.cursor()
        search_for_tasks = cur.execute(
            'SELECT * FROM tasks WHERE name=?', (new_task['name'],)
        ).fetchall()
        if not search_for_tasks:
            cur.execute(
                '''
                INSERT INTO tasks (name, cost, category, description, flag, is_active)
                VALUES (?,?,?,?,?,?)
                ''',
                (
                    new_task['name'],
                    new_task['cost'],
                    new_task['category'],
                    new_task['description'],
                    new_task['flag'],
                    new_task['is_active'],
                ),
            )
        cur.connection.commit()


if __name__ == '__main__':
    args = parser.parse_args()
    write_data(args.db_path)
