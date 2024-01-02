'use client'

import * as Sheet from '@/components/atom/Sheet/Sheet'
import { Button } from '@/components/atom/Button/Button'
import {
  Bars,
  PaperWithLinesColored,
  PaperWithSignalColored,
} from '@/components/atom/Icon'
import { useTranslations } from 'next-intl'
import { routes } from '@/constants/routes'
import * as styles from '@/app/[locale]/components/MenuSheet/menuSheet.css'
import { Link } from '@/components/atom/Link/Link'

export function MenuSheet() {
  const t = useTranslations()

  return (
    <Sheet.Root>
      <Sheet.Trigger asChild>
        <Button shape="round" color="secondary">
          <Bars />
        </Button>
      </Sheet.Trigger>
      <Sheet.Content>
        <Sheet.Header>
          <Sheet.Title>{t('MenuSheet.title')}</Sheet.Title>
        </Sheet.Header>
        <nav className={styles.nav}>
          <ul className={styles.list}>
            <li>
              <Sheet.Close asChild>
                <Link href={routes.root}>
                  <div className={styles.menuItem}>
                    <PaperWithLinesColored width="1.5rem" height="1.5rem" />
                    {t('MenuSheet.postsPage')}
                  </div>
                </Link>
              </Sheet.Close>
            </li>
            <li>
              <Sheet.Close asChild>
                <Link href={routes.blogs}>
                  <div className={styles.menuItem}>
                    <PaperWithSignalColored width="1.5rem" height="1.5rem" />
                    {t('MenuSheet.blogsPage')}
                  </div>
                </Link>
              </Sheet.Close>
            </li>
          </ul>
        </nav>
      </Sheet.Content>
    </Sheet.Root>
  )
}
