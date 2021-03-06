from django.db import models
from django.conf import settings
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.utils.translation import gettext_lazy as _
from user import managers

# Create your models here.


class User(AbstractBaseUser, PermissionsMixin):
    """Model definition for User."""

    first_name = models.CharField(max_length=250, null=True)
    middle_name = models.CharField(max_length=250, null=True, blank=True)
    last_name = models.CharField(max_length=250, null=True)
    username = models.CharField(max_length=250, unique=True, null=True)
    email = models.EmailField(max_length=250, unique=True)
    employee_id = models.CharField(max_length=250, unique=True, null=True, blank=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_employee = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    timestamp = models.DateTimeField(auto_now=False, auto_now_add=True)

    objects = managers.UserManager()

    # This is necessary as the fields are switched
    USERNAME_FIELD = 'email'
    EMAIL_FIELD = 'username'
    EMPLOYEE_ID_FIELD = 'employee_id'

    class Meta:
        """Meta definition for User."""
        ordering = ['id']
        verbose_name = _("User")
        verbose_name_plural = _("Users")

    def __str__(self):
        """String representation of User."""
        try: 
            return self.full_name()
        except Exception:
            return str(self.id)
          
    def full_name(self):
        if self.first_name and self.last_name and self.middle_name:
            return f"{self.last_name} {self.first_name} {self.middle_name}"
        elif self.first_name and self.last_name:
            return f"{self.last_name} {self.first_name}"
        else:
            return f"{self.email}"
