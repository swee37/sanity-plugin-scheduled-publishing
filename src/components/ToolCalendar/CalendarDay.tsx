import {Card, CardTone, Text} from '@sanity/ui'
import {isWeekend} from 'date-fns'
import React, {useCallback} from 'react'

interface CalendarDayProps {
  date: Date
  focused?: boolean
  onSelect: (date: Date) => void
  isCurrentMonth?: boolean
  isToday: boolean
  selected?: boolean
}

export function CalendarDay(props: CalendarDayProps) {
  const {date, focused, isCurrentMonth, isToday, onSelect, selected} = props

  const handleClick = useCallback(() => {
    onSelect(date)
  }, [date, onSelect])

  let tone: CardTone
  if (isToday || selected) {
    tone = 'primary'
  } else if (isWeekend(date)) {
    // tone = 'transparent'
    tone = 'default'
  } else {
    tone = 'default'
  }

  return (
    <div aria-selected={selected} data-ui="CalendarDay">
      <Card
        aria-label={date.toDateString()}
        aria-pressed={selected}
        as="button"
        __unstable_focusRing
        data-weekday
        data-focused={focused ? 'true' : ''}
        role="button"
        tabIndex={-1}
        onClick={handleClick}
        paddingX={3}
        paddingY={4}
        selected={selected}
        tone={tone}
      >
        <Text
          muted={!selected && !isCurrentMonth}
          size={1}
          style={{textAlign: 'center'}}
          weight={isCurrentMonth ? 'medium' : 'regular'}
        >
          {date.getDate()}
        </Text>
      </Card>
    </div>
  )
}
