import * as styles from '@/app/[locale]/blogs/loading.css'
import { useRandom } from '@/hooks/useRandom/useRandom'
import { Skeleton } from '@/components/atom/Skeleton/Skeleton'

export default function BlogsLoading() {
  const { getRandomNumber } = useRandom()
  const length = 30

  return (
    <main className={styles.main}>
      <section className={styles.section}>
        <div className={styles.list}>
          {Array.from({ length }, (_, index) => index).map((key) => {
            return (
              <div className={styles.item} key={key}>
                <div className={styles.company}>
                  <div className={styles.companyIcon}>
                    <Skeleton />
                  </div>
                  <div
                    className={styles.title}
                    style={{ width: getRandomNumber({ min: 30, max: 150 }) }}
                  >
                    <Skeleton />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </main>
  )
}
