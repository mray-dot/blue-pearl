from django.http import JsonResponse

def home(request):
    return JsonResponse({"status": "Blue Pearl API running"})
