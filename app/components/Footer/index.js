import React from 'react';

import A from 'components/A';
import styles from './styles.css';

function Footer() {
  return (
    <footer className={styles.footer}>
      <section>
        <p>&copy; 2016 Videos Tutorials.</p>
      </section>
      <section>
        <p>Made with love by <A href="https://ankitduseja.com/">Ankit Duseja</A>.</p>
      </section>
    </footer>
  );
}

export default Footer;
