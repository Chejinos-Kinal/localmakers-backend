import { initServer } from './configs/app.js';
import { connect } from './db/mongo.js';
import { professionDefault } from './controllers/profession.controller.js';

initServer();
connect();

professionDefault('Electricista', 'El profesional cuenta con conocimientos en cableado y electricidad', 'https://www.mndelgolfo.com/blog/wp-content/uploads/2017/09/herramientas-para-electricista.jpg')
professionDefault('Carpintero', 'El trabajador tiene conocimientos en el manejo y construcción con madera', 'https://irp.cdn-website.com/9c03a74a/dms3rep/multi/carpintero.jpg')
professionDefault('Plomero', 'Conocimiento con sistemas de agua en casas', 'https://homesolution.net/blog/wp-content/uploads/2019/02/plomero_a_domicilio_teusaquillo_bogota_colombia.jpg')
professionDefault('Pintor', 'Sabe pintar casas a domicilio', 'https://lh3.googleusercontent.com/proxy/ykx81cGjas9amt5WzBDEmyppaZrS8xMF9zQu6zUXORvjCxgFel5mY7zAj8UEqlBLH2tYbT7rmPaevuwufJAcvu07lOTKd1IwaAGN17mYQkSBumHC7J21j-sOqK3rTQ1sLpJnNwPXD2XMUZ2-C9i3Hxcvzt0yhMow')