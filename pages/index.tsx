import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {PrismaClient} from '@prisma/client'
import Scanner from '../components/Scanner'


  export const getServerSideProps: GetServerSideProps = async (context) => {
    const prisma = new PrismaClient()
    const products  = await prisma.product.findMany()

    // Creating a new record
    await prisma.product.create({
      data: {
        barcode: 'test',
        price: 1
      }
    });

    return {
    props : { products }
    }
  }
    


const Home: NextPage = ({products}) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>shopNhop</title>
        <meta name="description" content="Barcode self-checkout App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
      <Scanner></Scanner>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>
        {products.map((product) => (
          <p key={product.id}>{product.createdAt.toISOString()}</p>
        )
            )}

      
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}

export default Home
