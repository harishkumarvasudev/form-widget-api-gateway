import admin from 'firebase-admin';
import config from '../../config/config.js';

// Firebase configuration object containing the necessary credentials
const firebaseConfig = {
  type: config.database.type,
  project_id: config.database.project_id,
  private_key_id: config.database.private_key_id,
  private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDFf+IKeBb0+9cU\ntqSnjS8aeyDx9DuQwEOip75G30wucHCNvk/+9iIBCKwAseYvT7TsCjOpAhjH295S\nnutEflVNrcn48C1LI844NX+3fauYu/Hr3AJLMiUurV9KgGAyCgGFcp4eG0TtzqQn\n4Mdw9FgSuXEaEfm2RTK6PLUP3/wfrs6nuaQl5JmgPh/AG7/h123Nkr168FMYgV6g\nNWayspB7DqMBTztsAtB2mExqrf+zLT1qqcLTB7moN4T+iVRyc59uFfkf2z/rGaur\nZJMjJAW+/DE6YtAOKT1joNnuFq4+GAnh5PCQsn4VFCIqTkyfixD+fJ++S4XTIWus\nQeefISjFAgMBAAECggEAEe9omBnKv+mk4RErB7o3BlkbJ03OIPmMytcf3PDHSspU\nNlMLkbRJZz2h3RhKto4u+GZ+xYDWvkOVv3wGEnzEg17eYhhxjIrOXeVh2Uh0zlR3\nBju/C5Qcs030QuBAnBqzg6pieIpyaoQi/SoZAoV2ABFOF5d9TVOgZTBBIxVsoHXG\n5A+pCY2iu82/ls27lYxw/aLyWc4FnpwxQ3QB5dNNz/ZrNkxmWreMPfkXQ5g8t+fD\nbxZDTmI1B9sf2Ymc/yCAJ/19w07bwV3qzv8RlUEKC8seEOgMrgCGff+XYADpR2sV\ns6bkR1kds5uKliAs9o2C3W5DXNJJt9LiR9+D1E/8QQKBgQD6Z1oqu+dO0AAXyWlT\n4wbVdb+o2Q1tP5pLGXVwbIsdBUYb0PhmqNCfqWK0EQsPxrNSGI8DMP5WztWEldUM\nmzP+5kWbsxF8eavBgZmBC8Q/CK3BCGg0AMOcPAGAC1fnitaPTudIjAX6F5Glp4Bi\nygHW+UrSIfJucuQorzPzPOkc4QKBgQDJ6djrzTHSazlN3BmpQdoDd4zhtsv5dMX1\n7RzFnEgdT/a3zqYUGJr0MYaqwJdf10reULg1Dk2h0ci7iTmEIvm3b6ItmgM01zyn\n3D5eBO/tC43IcCw5EvViPsg4X5qGQCI5RKhcoBFcUkfT87SugerO6sG3dGcXPflW\nZf8xJh1EZQKBgQDdjYiH+w2j/AG5Cio5YMvxHmff+3wXx4i7HeF9AWzs1ne7sN+3\n5XIBcpu0esfww3xyDOyshDLll8fvsap5pvEQfanlI0E7g2PmqMarGUAgDYu/GbMp\nH+vzVlx1cJPseDlzPvsAg3PeXfAuQ9AimF2cWaJL3mFkPB+Hp80tUB1pwQKBgC3L\na/ePQo2G5ChUkz1gQiInKzzGSNz7Lyrn7G6lU3XSfRKTO/ey3PIliXWQ2MRUABcM\nF7tw0wqwmeZu6SyfAiQonY/aLn/9kTRBL6QDWqdYx39+cYlAU4dE1gRzKojoYtq6\nR7U6WLWns8LOs1wg+zCS7fy92ePbmoGOAKMVEe5BAoGAbmxm10VoOkOESkyHowIl\nnB7Af7I4n77QCpub5FmyhWa39ZnMrB0tJkdQXcNNWoxHRLYACQb7jptf0a0seBTL\nIbaa3dJVtejAHn3YD+IKQDARs+2byvBbuliYwSH3/2w7iLoo4VfE+hCgoGIqkSRe\ntG0RfOWVefhx68Ej0Q/9fKY=\n-----END PRIVATE KEY-----\n", // Replace escaped newlines with actual newlines
  client_email: config.database.client_email,
  client_id: config.database.client_id,
  auth_uri: config.database.auth_uri,
  token_uri: config.database.token_uri,
  auth_provider_x509_cert_url: config.database.auth_provider_x509_cert_url,
  client_x509_cert_url: config.database.client_x509_cert_url,
  universe_domain: config.database.universe_domain
};

// Initialize the Firebase Admin SDK with the provided configuration
admin.initializeApp({
  credential: admin.credential.cert(firebaseConfig),
  databaseURL: config.database.databaseURL // Replace with your Firebase Realtime Database URL
});

// Get a reference to the Firebase Realtime Database
const db = admin.database();

export { db };