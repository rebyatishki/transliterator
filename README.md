# tranliterator
en -> ru+en transliterator app

## Development

```bash
git clone https://github.com/rebyatishki/tranliterator
cd transliterator
pip install -r requirements.txt
cp contrib/config.py .
# edit config.py
export APP_SETTINGS="config.DevelopmentConfig"
python run.py
```

## Installation in production

```bash
sudo su -
mkdir -p /var/www/transliterator
git clone https://github.com/rebyatishki/tranliterator /var/www/transliterator
cd /var/www/transliterator
pip install -r requirements.txt
apt-get install -y nginx uwsgi uwsgi-plugin-python
cp contrib/config.py .
# edit config.py
cp contrib/uwsgi.ini /etc/uwsgi/apps-available/transliterator.ini
ln -s /etc/uwsgi/apps-available/transliterator.ini /etc/uwsgi/apps-enabled/transliterator.ini
service uwsgi restart
cp contrib/nginx.conf /etc/nginx/sites-enabled/transliterator.conf
# edit /etc/nginx/sites-enabled/transliterator.conf
service nginx restart
```
