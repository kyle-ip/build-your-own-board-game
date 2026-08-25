import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { CopySimple, Check } from '@phosphor-icons/react'
import { copyText } from '../lib/storage'
import { Button } from './Button'

export function CopyButton({ text }: { text: string }) {
  const { t } = useTranslation('common')
  const [ok, setOk] = useState(false)

  async function onCopy() {
    await copyText(text)
    setOk(true)
    window.setTimeout(() => setOk(false), 1600)
  }

  return (
    <Button variant="ghost" onClick={() => void onCopy()} className="!px-3 !py-1.5">
      {ok ? <Check size={16} weight="bold" /> : <CopySimple size={16} />}
      {ok ? t('cta.copied') : t('cta.copy')}
    </Button>
  )
}
