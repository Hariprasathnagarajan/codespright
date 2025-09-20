"""
URL configuration for EduMentor backend project.
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

# API Router
router = DefaultRouter()

urlpatterns = [
    # Admin
    path('admin/', admin.site.urls),
    
    # API Authentication
    path('api/auth/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
    # API Routes
    path('api/auth/', include('apps.authentication.urls')),
    path('api/courses/', include('apps.courses.urls')),
    path('api/mentorship/', include('apps.mentorship.urls')),
    path('api/communication/', include('apps.communication.urls')),
    path('api/analytics/', include('apps.analytics.urls')),
    
    # API Root
    path('api/', include(router.urls)),
]

# Serve media files in development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

# Admin site customization
admin.site.site_header = "EduMentor Administration"
admin.site.site_title = "EduMentor Admin"
admin.site.index_title = "Welcome to EduMentor Administration"