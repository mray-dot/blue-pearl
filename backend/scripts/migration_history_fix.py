from django.db.migrations.recorder import MigrationRecorder
from django import setup
import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE','blue_pearl_core.settings')
setup()
rec = MigrationRecorder
qs_admin = rec.Migration.objects.filter(app='admin').values_list('name', flat=True)
qs_auth = rec.Migration.objects.filter(app='authentication').values_list('name', flat=True)
print('ADMIN_MIGRATIONS_BACKUP:', list(qs_admin))
print('AUTH_MIGRATIONS_BACKUP:', list(qs_auth))
# delete admin records
rec.Migration.objects.filter(app='admin').delete()
print('Deleted admin migration records.')
