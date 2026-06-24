# from django.urls import path
# from .views import api_register_user, api_login_user

# urlpatterns = [
#     path('register/', api_register_user, name='register'),
#     path('login/', api_login_user, name='login'),
# ]   


from django.urls import path
from .views import register_user, login_user

urlpatterns = [
    path('register/', register_user, name='register'),
    path('login/', login_user, name='login'),
]