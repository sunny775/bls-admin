import {useEffect} from 'react'
import Head from 'next/head'
import cookies from 'next-cookies'
import axios from 'axios'
import Link from 'next/link'
import config from '../config/system'
import useAuth from '../hooks/auth'

export default function Dashboard() {
  const {signOut, data} = useAuth();

  useEffect(() => {
    console.log('data')
  }, [])
  const uid = data && data.uid;

  /*if(!result.decodedToken){
    return <div style={{width: '100vw', height:'100vh', display: 'flex', justifyContent:'center', alignItems:'center'}}><button className='btn btn-danger'>Unauthorised access denied!</button></div>
  }*/
  const emojis = ['😂','😃']
  const color = 'blue'
  
  return (
    <div className="container">
      <Head>
        <title>BetterLifesavings admin dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        { !data ? <div>Loading...</div> : (data && !data.uid) ? <div className="error">
          Unauthorized access <Link href='/'><a>Login</a></Link>
        </div> : null}

        <div className='authorized'>
        <p className="description shadow-sm">
          {data && `Welcome ${data.name}`}
        </p>
        <button className='btn btn-info logout' onClick={()=>signOut()}>&#10061; logout</button>

        <div className="grid">
          <Link href='/admins'>
          <a className="card shadow-sm">
            <h3>Admins &rarr;</h3>
            <p>Add and remove admin user for Betterlife Savings</p>
          </a>
          </Link>

          <Link href='/users'>
          <a className="card shadow-sm">
            <h3>Clients &rarr;</h3>
            <p>Manage all client accounts for Betterlife Saving</p>
          </a>
          </Link>

          <Link href='/transactions'>
          <a className="card shadow-sm">
            <h3>Transactions &rarr;</h3>
            <p>Manage all user transactions for Betterlife Savings</p>
          </a>
          </Link>
          <Link href='/notifications'>
          <a className="card shadow-sm">
            <h3>Broadcast &rarr;</h3>
            <p>Send a broadcast message to all registered users</p>
          </a>
          </Link>
        </div>
        </div>
      </main>

      <footer>
      <div>
        © BetterlifeSavings {new Date().getFullYear()}. All rights reserved.
        </div>
      </footer>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 3rem 0 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        .authorized{
          display: ${uid ? 'block' : 'none'};
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .error a{
          background: #bbdefb;
          padding: 10px 20px;
          marging: 15px;
          margin-left: 25px;
          border-radius: 4px;
        }

        .error {
          line-height: 1.15;
          color: #ff5252 ;
          border: 1px solid #ff8a80;
          padding: 1.5rem;
          border-radius: 10px;
          margin-top: 2.5em;
        }

        .error,
        .description {
          text-align: center;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
          background: #fafafa;
          padding: 5px 20px;
          border-radius: 10px;
          margin-top: 2.5em;
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          max-width: 800px;
          margin-top: 3rem;
        }

        .card {
          margin: 1rem;
          flex-basis: 45%;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
        }

        .card:hover,
        .card:focus,
        .card:active {
          color: #0070f3;
          border-color: #0070f3;
        }

        .card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }

        .card p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }

        .logo {
          height: 1em;
        }
        .logout{
          position: fixed;
          top:15px;
          right: 15px;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  )
}

/*export async function getStaticProps(context) {
  
    try {
      
      return {
        props: {result} 
      }
    } catch (error) {
      console.log('errresponse:',error.response.data)
      return {
        props: {result: error.response.data} 
      }
    }

}*/
