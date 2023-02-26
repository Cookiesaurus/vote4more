import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/components/layout.module.css';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';
import Nav from './nav';

export default function Layout({ children }) {
  return (
    <>
      <Nav/>
      <div className={styles.container}>
        {children}
      </div>
    </>    
  );
}
