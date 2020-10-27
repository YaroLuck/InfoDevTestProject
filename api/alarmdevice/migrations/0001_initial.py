# Generated by Django 3.1.2 on 2020-10-27 09:46

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Device',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50, verbose_name='Название')),
                ('device_type', models.CharField(choices=[('siren', 'Сирена'), ('speaker', 'Громкоговоритель')], default='siren', max_length=50, verbose_name='Тип устройства')),
                ('address', models.CharField(max_length=50, verbose_name='Адрес')),
                ('latitude', models.DecimalField(decimal_places=6, max_digits=10, verbose_name='Широта')),
                ('longtitude', models.DecimalField(decimal_places=6, max_digits=10, verbose_name='Долгота')),
                ('cover_radius', models.PositiveIntegerField(default=0, verbose_name='Радиус звукопокрытия')),
            ],
        ),
    ]