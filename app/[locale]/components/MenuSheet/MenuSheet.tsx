import * as Sheet from '@/components/atom/Sheet/Sheet'
import { Button } from '@/components/atom/Button/Button'
import {
  Bars,
  CogWithCardColored,
  Github,
  LinkedIn,
  PaperWithLinesColored,
  PaperWithSignalColored,
  Rss,
  StarInTheBookColored,
} from '@/components/atom/Icon'
import { routes } from '@/constants/routes'
import * as styles from '@/app/[locale]/components/MenuSheet/menuSheet.css'
import { Link } from '@/components/atom/Link/Link'
import { ExternalLink } from '@/components/atom/ExternalLink/ExternalLink'
import { auth } from '@/auth'
import { getTranslations } from 'next-intl/server'

export async function MenuSheet() {
  const t = await getTranslations()
  const data = await auth()

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
            {data?.user && (
              <>
                <li>
                  <Sheet.Close asChild>
                    <Link href={routes.bookmarks}>
                      <div className={styles.menuItem}>
                        <StarInTheBookColored width="1.5rem" height="1.5rem" />
                        {t('MenuSheet.bookmarksPage')}
                      </div>
                    </Link>
                  </Sheet.Close>
                </li>
                <li>
                  <Sheet.Close asChild>
                    <Link href={routes.mypage}>
                      <div className={styles.menuItem}>
                        <CogWithCardColored width="1.5rem" height="1.5rem" />
                        {t('MenuSheet.mypagePage')}
                      </div>
                    </Link>
                  </Sheet.Close>
                </li>
              </>
            )}
          </ul>
        </nav>
        <Sheet.Footer>
          <Sheet.Close asChild>
            <Link href={routes.termsService}>
              <span className={styles.terms}>
                {t('MenuSheet.termsServicePage')}
              </span>
            </Link>
          </Sheet.Close>
          <Sheet.Close asChild>
            <Link href={routes.termsPrivacy}>
              <span className={styles.termsAccent}>
                {t('MenuSheet.termsPrivacyPage')}
              </span>
            </Link>
          </Sheet.Close>
          <div className={styles.footerIcons}>
            <ExternalLink href="https://github.com/jthcast/techblogposts">
              <Github className={styles.footerIcon} />
            </ExternalLink>
            <ExternalLink href="https://linkedin.com/in/jthcast">
              <LinkedIn className={styles.footerIcon} />
            </ExternalLink>
            <ExternalLink href="/rss.xml">
              <Rss className={styles.footerIcon} />
            </ExternalLink>
          </div>
          <Link href="mailto:jthcast@gmail.com" isUnderline>
            <span className={styles.copyright}>
              © {new Date().getFullYear()} JthCast
            </span>
          </Link>
        </Sheet.Footer>
      </Sheet.Content>
    </Sheet.Root>
  )
}
