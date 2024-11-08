FROM php:8.2-apache
WORKDIR /var/www/html
#RUN chmod -R 777 /var/www/html/
#RUN chown -R 777 /var/www/html/
RUN docker-php-ext-install mysqli pdo pdo_mysql && docker-php-ext-enable mysqli
RUN a2enmod rewrite
RUN apachectl restart
RUN service apache2 restart