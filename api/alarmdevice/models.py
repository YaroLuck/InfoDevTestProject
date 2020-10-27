from django.db import models


class Device(models.Model):
    """
    Устройство оповещения
    """

    SIREN = 'siren'
    SPEAKER = 'speaker'
    DEVICES = (
        (SIREN, 'Сирена'),
        (SPEAKER, 'Громкоговоритель'),
    )
    name = models.CharField(
        "Название",
         max_length=50
    )
    device_type = models.CharField(
        "Тип устройства",
         max_length=50,
          choices=DEVICES,
           default='siren'
    )
    address = models.CharField(
        "Адрес",
         max_length=50
    )
    latitude = models.DecimalField(
        "Широта",
         max_digits=10,
          decimal_places=6
    )
    longtitude = models.DecimalField(
        "Долгота",
         max_digits=10,
          decimal_places=6
    )
    cover_radius = models.PositiveIntegerField(
        "Радиус звукопокрытия",
         default=0
    )

    class Meta:
        verbose_name = "Устройство"
        verbose_name_plural = "Устройства"

    def __str__(self):
        return self.name
    