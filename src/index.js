import { initServer } from './configs/app.js';
import { connect } from './db/mongo.js';
import { professionDefault } from './controllers/profession.controller.js';
import { userDefault } from './controllers/user.controller.js';

initServer();
connect();

const defaultCosas = async () => {
  await professionDefault(
    'Electricista',
    'El profesional cuenta con conocimientos en cableado y electricidad',
    'https://www.mndelgolfo.com/blog/wp-content/uploads/2017/09/herramientas-para-electricista.jpg',
  );
  await professionDefault(
    'Carpintero',
    'El trabajador tiene conocimientos en el manejo y construcción con madera',
    'https://irp.cdn-website.com/9c03a74a/dms3rep/multi/carpintero.jpg',
  );
  await professionDefault(
    'Plomero',
    'Conocimiento con sistemas de agua en casas',
    'https://homesolution.net/blog/wp-content/uploads/2019/02/plomero_a_domicilio_teusaquillo_bogota_colombia.jpg',
  );
  await professionDefault(
    'Pintor',
    'Sabe pintar casas a domicilio',
    'https://lh3.googleusercontent.com/proxy/ykx81cGjas9amt5WzBDEmyppaZrS8xMF9zQu6zUXORvjCxgFel5mY7zAj8UEqlBLH2tYbT7rmPaevuwufJAcvu07lOTKd1IwaAGN17mYQkSBumHC7J21j-sOqK3rTQ1sLpJnNwPXD2XMUZ2-C9i3Hxcvzt0yhMow',
  );

  await userDefault(
    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/1200px-User_icon_2.svg.png',
    'Josué',
    'Pérez',
    'jperez-2022076@kinal.edu.gt',
    'jperez',
    '12345678',
    '12345678',
    'Fundación Kinal',
    '',
    'CLIENT',
    'Hola',
  );

  await userDefault(
    'https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1095249842.jpg',
    'James',
    'Sipac',
    'jsipac-2022@kinal.edu.gt',
    'jsipac',
    '12345678',
    '12345678',
    'Mega',
    '',
    'CLIENT',
    'Hola',
  );

  await userDefault(
    'https://cdn-icons-png.flaticon.com/512/6073/6073873.png',
    'Sergio',
    'Tepaz',
    'stepaz-2022@gmail.com',
    'stepaz',
    '12345678',
    '12345678',
    'Su casa',
    'Pintor',
    'PROFESSIONAL',
    'Hola',
  );

  await userDefault(
    'https://png.pngtree.com/png-clipart/20190516/original/pngtree-users-vector-icon-png-image_3725294.jpg',
    'Byron',
    'Roquel',
    'broquel-2022@gmail.com',
    'broquel',
    '12345678',
    '12345678',
    'Su casa',
    'Plomero',
    'PROFESSIONAL',
    'Hola',
  );
};

defaultCosas();
