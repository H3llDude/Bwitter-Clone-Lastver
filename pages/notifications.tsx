import Header from "@/components/Header";
import NotificationsFeed from "@/components/NotificationsFeed";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";
import { permanentRedirect } from "next/navigation";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}

const Notifications = () => {
  return (
    <>
      <Header label="Notifications" showBackArrow />
      <NotificationsFeed />
    </>
  );
};
export default Notifications;
