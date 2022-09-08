from sqlalchemy import (
    Boolean,
    Column,
    DateTime,
    ForeignKey,
    Integer,
    String,
    Table,
)

from sqlalchemy.orm import declarative_base, relationship


Base = declarative_base()


class SolvedTask(Base):
    __tablename__ = 'user_solved'
    user_id = Column(ForeignKey('users.id'), primary_key=True)
    task_id = Column(ForeignKey('tasks.id'), primary_key=True)
    time = Column(DateTime)
    user = relationship('User', back_populates='solved_tasks')
    task = relationship('Task', back_populates='users_solved')


contest_to_task = Table(
    'contest_task',
    Base.metadata,
    Column('contest_id', ForeignKey('contests.id'), primary_key=True),
    Column('task_id', ForeignKey('tasks.id'), primary_key=True),
)

user_groups = Table(
    'user_groups',
    Base.metadata,
    Column('user_id', ForeignKey('users.id'), primary_key=True),
    Column('group_id', ForeignKey('groups.id'), primary_key=True),
)


class Contest(Base):
    __tablename__ = 'contests'
    id = Column(Integer, primary_key=True)
    name = Column(String)
    description = Column(String)
    is_active = Column(Boolean, default=False)
    tasks = relationship('Task', secondary=contest_to_task, back_populates='contests')


class Task(Base):
    __tablename__ = 'tasks'
    id = Column(Integer, primary_key=True)
    name = Column(String)
    cost = Column(Integer)
    category = Column(String)
    description = Column(String)
    flag = Column(String)
    is_active = Column(Boolean, default=False)
    users_solved = relationship('SolvedTask', back_populates='task')
    contests = relationship('Contest', secondary=contest_to_task, back_populates='tasks')


class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    login = Column(Integer)
    password = Column(String)
    fio = Column(String)
    solved = Column(String)
    solved_tasks = relationship('SolvedTask', back_populates='user')
    users = relationship('Group', secondary=user_groups, back_populates='users')


class Group(Base):
    __tablename__ = 'groups'
    id = Column(Integer, primary_key=True)
    name = Column(String)
    users = relationship('User', secondary=user_groups, back_populates='groups')
