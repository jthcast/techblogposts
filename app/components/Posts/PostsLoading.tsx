import * as styles from '@/app/components/Posts/postsLoading.css'
import { useRandom } from '@/hooks/useRandom/useRandom'
import { Skeleton } from '@/components/atom/Skeleton/Skeleton'
import * as Separator from '@/components/atom/Separator/Separator'
import { Fragment } from 'react'

export default function PostsLoading() {
  const { getRandomNumber } = useRandom()
  const length = 10

  return (
    <div className={styles.list}>
      {Array.from({ length }, (_, index) => index).map((key) => {
        const isLastItem = key === length

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
            {!isLastItem && <Separator.Separator />}
          </Fragment>
        )
      })}
    </div>
  )
}
