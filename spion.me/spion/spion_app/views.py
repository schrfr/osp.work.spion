"""
spion.views
"""

from django.http import HttpResponse, Http404
from django.shortcuts import render_to_response
from django.template import RequestContext

from spion_app.models import (NewsItem,UserProfile, User)


def index(request):
    tpl_params = {}
    tpl_params['news'] = NewsItem.objects.all()
    tpl_params['profiles'] = UserProfile.objects.all()
    return render_to_response("home.html", tpl_params, context_instance = RequestContext(request))
    
    
def profile(request, uid):
    tpl_params = {}
    user_profile = UserProfile.objects.get(user=uid)
    tpl_params['user'] = user_profile.user
    tpl_params['bio'] = user_profile.bio
    tpl_params['publications'] = user_profile.publications.all()
    return render_to_response("profile.html", tpl_params, context_instance = RequestContext(request))


