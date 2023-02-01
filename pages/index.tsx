import Head from "next/head";
import Header from "../components/Header";
import styles from "../styles/Home.module.css";
import { getCsrfToken, getSession, useSession } from "next-auth/react";
import Link from "next/link";
import { GetStaticProps } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import Image from "next/image";

export default function Home() {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  const user: any = session?.user;

  console.log(session);
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <h1 className={styles.title}>
          Authentication in Next.js app using Next-Auth
        </h1>
        <div className={styles.user}>
          {loading && <div className={styles.title}>Loading...</div>}
          {session && (
            <>
              <p style={{ marginBottom: "10px" }}>
                {" "}
                Welcome, {session.user?.name ?? session.user?.email}
              </p>{" "}
              <br />
              {/* <Image
                src={session.user?.image || ""}
                alt=""
                width={200}
                className={styles.avatar}
                height={200}
              /> */}
            </>
          )}
          {!session && (
            <>
              <p className={styles.title}>Please Sign in</p>
              {/* <img
                src="https://cdn.dribbble.com/users/759083/screenshots/6915953/2.gif"
                alt=""
                className={styles.avatar}
                width={200}
                height={200}
              /> */}
              <p className={styles.credit}>
                GIF by{" "}
                <Link href="https://dribbble.com/shots/6915953-Another-man-down/attachments/6915953-Another-man-down?mode=media">
                  Another man
                </Link>{" "}
              </p>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export async function getStaticProps() {
  // console.log(await getServerSession(req, res, authOptions));
  const csrfToken = await getCsrfToken();
  console.log(csrfToken);

  return {
    props: {
      // session: await getServerSession(req, res, authOptions),
    },
  };
}
