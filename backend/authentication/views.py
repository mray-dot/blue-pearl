import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, login
from .models import User, UserProfile

@csrf_exempt
def register_user(request):
    if request.method != 'POST':
        return JsonResponse({'error': 'Method not allowed'}, status=405)

    try:
        data = json.loads(request.body)

        email = data.get('email')
        if not email:
            return JsonResponse({'error': 'Email is required'}, status=400)

        if User.objects.filter(email=email).exists():
            return JsonResponse({'error': 'Email already registered'}, status=400)

        user = User.objects.create_user(
            email=email,
            password=data.get('password'),
            phone_number=data.get('phone')
        )

        UserProfile.objects.create(
            user=user,
            full_name=data.get('name', ''),
            gender=data.get('gender', ''),
            occupation=data.get('occupation', ''),
            years_of_experience=data.get('experience', ''),
            date_of_birth=data.get('dob'),
            country_code=data.get('country_code', ''),
            country=data.get('country', ''),
            state=data.get('state', ''),
            postal_zip_code=data.get('zip', '')
        )

        return JsonResponse({'success': 'Account created successfully'}, status=201)

    except Exception as e:
        return JsonResponse({'error': str(e)}, status=400)


@csrf_exempt
def login_user(request):
    if request.method != 'POST':
        return JsonResponse({'error': 'Method not allowed'}, status=405)

    try:
        data = json.loads(request.body)
        email = data.get('email')
        password = data.get('password')

        if not email or not password:
            return JsonResponse({'error': 'Email and password are required'}, status=400)

        user = authenticate(username=email, password=password)

        if user is not None:
            login(request, user)
            profile = getattr(user, 'profile', None)
            full_name = profile.full_name if profile else email
            return JsonResponse({
                'success': 'Login successful',
                'email': user.email,
                'full_name': full_name
            })
        else:
            return JsonResponse({'error': 'Invalid email or password'}, status=401)

    except Exception as e:
        return JsonResponse({'error': str(e)}, status=400)