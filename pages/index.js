import { useEffect } from "react";
import Head from "next/head";
import SignIn from "../components/SignIn";
import useAuth from "../hooks/auth";
import Dashboard from "./dashboard";
import Router from "next/router";

export default function Home() {
  const { error, data, email, signOut } = useAuth();
  const uid = data && data.uid;
  //uid && Router.push("/dashboard");
  const goToDashboard = () => Router.push('/dashboard');

  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
      <button className='btn btn-info logout' onClick={()=>signOut()}>&#10061; logout</button>
        <h2 className="title">Bls Admin</h2>
        {!data ? (
          <div>Loading...</div>
        ) : error ? (
          <div>
            <p className="error">
              {`Permission denied! for ${email}`}
              <br />
              Try another account
            </p>
            <SignIn className="sign-in" />
          </div>
        ) : uid ? (
          <div className='text-center'>Welcome back {data.name} <br/><span className='btn btn-success' onClick={()=>goToDashboard()}>Go to Dashboard &rarr;</span></div>
        ) : (
          <SignIn className="sign-in" />
        )}
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
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
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

        .title {
          margin: 0;
          line-height: 1.15;
        }

        .title {
          text-align: center;
        }
        .error {
          color: #ff5252;
          font-size: 0.9em;
          text-align: center;
          margin-top: 10px;
        }
        .sign-in {
          display: ${uid ? "none" : "block"};
        }
        .logout{
          position: fixed;
          top:15px;
          right: 15px;
          display: ${uid || error ? 'block' : 'none'}
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
