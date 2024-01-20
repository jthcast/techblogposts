'use client'

import * as styles from '@/app/[locale]/page.css'
import Posts from '@/app/components/Posts/Posts'
import PostsLoading from '@/app/components/Posts/PostsLoading'
import { Suspense } from 'react'

export default function LocalePage() {
  return (
    <main>
      <section className={styles.section}>
        <Suspense fallback={<PostsLoading />}>
          <Posts />
        </Suspense>
      </section>
    </main>
  )
}
