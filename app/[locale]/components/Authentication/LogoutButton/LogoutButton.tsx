'use client'

import { Button } from '@/components/atom/Button/Button'
import { useTranslations } from 'next-intl'
import { signOut } from 'next-auth/react'

export function LogoutButton() {
  const t = useTranslations()

  return (
    <Button color="tertiary" isOutline onClick={() => signOut()}>
      {t('LogoutButton.logout')}
    </Button>
  )
}
