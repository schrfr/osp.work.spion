from django.conf.urls.defaults import patterns, include, url

urlpatterns = patterns('spion.spion_app.views',
    url(r'^$', 'index', name='home'),
    url(r'^about/$', 'about'),
    url(r'^publications/$', 'publications'),
    url(r'^publication/(?P<pslug>[\w-]+)$', 'publication'),
    url(r'^profiles/$', 'profiles'),
    url(r'^profile/(?P<uslug>[\w-]+)$', 'profile'),
    url(r'^newsitems/$', 'newsitems'),
    url(r'^newsitem/(?P<nslug>[\w-]+)$', 'newsitem'),
    url(r'^workpackages/$', 'work_packages'),
    url(r'^workpackage/(?P<wslug>[\w-]+)$', 'work_package'),
    url(r'^partners/$', 'partners'),
    url(r'^partner/(?P<pid>\d+)$', 'partner'),
)
