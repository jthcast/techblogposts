'use client'

import { deleteAuth } from '@/app/api/v1/auth/auth'
import { Button } from '@/components/atom/Button/Button'
import { useMutation } from '@tanstack/react-query'
import { signOut } from 'next-auth/react'
import { useTranslations } from 'next-intl'

export function DeleteAccountButton() {
  const t = useTranslations()

  const { mutate: deleteAccount } = useMutation({
    mutationFn: deleteAuth,
    onSuccess: () => signOut(),
  })

  return (
    <Button color="destructive" isGhost onClick={() => deleteAccount()}>
      {t('MypagePage.withdraw')}
    </Button>
  )
}
