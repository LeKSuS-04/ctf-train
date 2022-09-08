from fastapi import APIRouter

auth_router = APIRouter()

@auth_router.post('/register')
async def handle_register():
    raise NotImplementedError()

@auth_router.post('/login')
async def handle_login():
    raise NotImplementedError()
