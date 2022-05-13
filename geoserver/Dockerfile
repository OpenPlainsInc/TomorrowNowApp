FROM kartoza/geoserver:2.20.4

# USER geoserveruser
# RUN mkdir /opt/geoserver/data_dir/workspaces
# COPY workspaces /opt/geoserver/data_dir/workspaces
COPY ./target/geoserver-grass-raster-datastore-0.1.1-SNAPSHOT*.jar /usr/local/tomcat/webapps/geoserver/WEB-INF/lib/
# Add directory to mount actinia grassdata 
# RUN mkdir -p /opt/geoserver/actinia_data

CMD ["/bin/bash", "/scripts/entrypoint.sh"]
# CMD ["/bin/bash", "/usr/local/tomcat/bin/catalina.sh", "run"]