import Head from "next/head"
import React, {FC} from "react"
import {BlitzLayout} from "@blitzjs/next"

const Layout: BlitzLayout<{title?: string; children?: React.ReactNode}> = ({title, children}) => {
  return (
    <>
      <Head>
        <title>{title || "weekly_date_list_picker"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {children}
    </>
  )
}

export default Layout
