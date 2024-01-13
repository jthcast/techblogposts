'use client'

import { Button } from '@/components/atom/Button/Button'
import * as Dialog from '@/components/atom/Dialog/Dialog'
import * as styles from '@/app/[locale]/components/Authentication/LoginDialog/loginDialog.css'
import { GithubCircle, GoogleColored, Logo } from '@/components/atom/Icon'
import { useTranslations } from 'next-intl'
import { signIn } from 'next-auth/react'

export function LoginDialog() {
  const t = useTranslations()

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button>{t('LoginDialog.login')}</Button>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>
            <div className={styles.title}>
              <Logo width={'4rem'} height={'4rem'} />
              {t('Header.title')}
            </div>
          </Dialog.Title>
        </Dialog.Header>
        <Dialog.Footer>
          <Button color="google" onClick={() => signIn('google')}>
            <div className={styles.loginButton}>
              <GoogleColored />
              {t('LoginDialog.google')}
            </div>
          </Button>
          <Button color="github" onClick={() => signIn('github')}>
            <div className={styles.loginButton}>
              <GithubCircle />
              {t('LoginDialog.github')}
            </div>
          </Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog.Root>
  )
}
