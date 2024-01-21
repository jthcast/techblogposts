import * as styles from '@/app/components/Posts/postsLoading.css'
import { useRandom } from '@/hooks/useRandom/useRandom'
import { Skeleton } from '@/components/atom/Skeleton/Skeleton'
import { Fragment } from 'react'

interface PostsLoadingProps {
  length?: number
}

export default function PostsLoading({ length = 10 }: PostsLoadingProps) {
  const { getRandomNumber } = useRandom()

  return (
    <div className={styles.list}>
      {Array.from({ length }, (_, index) => index).map((key) => {
        return (
          <Fragment key={key}>
            <div className={styles.item}>
              <div
                className={styles.title}
                style={{ width: getRandomNumber({ min: 100, max: 300 }) }}
              >
                <Skeleton />
              </div>
              <div className={styles.content}>
                <div className={styles.leftContent}>
                  <div className={styles.companyIcon}>
                    <Skeleton />
                  </div>
                  <div
                    className={styles.company}
                    style={{
                      width: getRandomNumber({ min: 50, max: 150 }),
                    }}
                  >
                    <Skeleton />
                  </div>
                </div>
                <div className={styles.rightContent}>
                  <div className={styles.time}>
                    <Skeleton />
                  </div>
                  <div className={styles.viewCountIcon}>
                    <Skeleton />
                  </div>
                  <div className={styles.viewCount}>
                    <Skeleton />
                  </div>
                  <div className={styles.bookmark}>
                    <Skeleton />
                  </div>
                </div>
              </div>
            </div>
          </Fragment>
        )
      })}
    </div>
  )
}
