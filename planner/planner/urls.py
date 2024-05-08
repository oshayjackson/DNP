from django.contrib import admin
from django.urls import path, include
from core.views import *

urlpatterns = [
    path("admin/", admin.site.urls),
    path("home/", ReactView.as_view(), name="something"),
    path("home/<int:pk>/", ReactView.as_view(), name="react_detail"),
]
