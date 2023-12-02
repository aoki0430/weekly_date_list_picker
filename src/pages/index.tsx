import Layout from "src/core/layouts/Layout"
import { Routes, BlitzPage } from "@blitzjs/next"
import { Calendar, momentLocalizer, Views } from "react-big-calendar"
import Holidays from "date-holidays"

require("react-big-calendar/lib/css/react-big-calendar.css")

import moment from "moment"
// import "moment-timezone"
import "moment/locale/ja"

// TODO get locale from timezone
moment.locale("ja")

// 週の始まりを月曜日に設定
moment.updateLocale(moment.locale(), {
  week: {
    dow: 1, // 月曜日を週の始まりとする
  },
})

const hd = new Holidays("JP")
const this_year_holidays = hd.getHolidays(moment().year())
const next_year_holidays = hd.getHolidays(moment().year() + 1)
const before_year_holidays = hd.getHolidays(moment().year() - 1)

// TODO: アルゴリズムを改善する
// レンダリングごとに呼び出されるので一回だけにしたい

var holidayDates = this_year_holidays.map((holiday) => moment(holiday.date).format("YYYY-MM-DD"))
holidayDates = holidayDates.concat(
  next_year_holidays.map((holiday) => moment(holiday.date).format("YYYY-MM-DD"))
)
holidayDates = holidayDates.concat(
  before_year_holidays.map((holiday) => moment(holiday.date).format("YYYY-MM-DD"))
)

const localizer = momentLocalizer(moment)
const formats = {
  dateFormat: "D",
  dayFormat: "D(ddd)",
  monthHeaderFormat: "YYYY年M月",
  dayHeaderFormat: "M月D日(ddd)",
  dayRangeHeaderFormat: "YYYY年M月",
}

const customDayPropGetter = (date: Date) => {
  const year_month_day_of_date = date.toISOString().split("T")[0]
  const year_month_day_of_today = moment().format("YYYY-MM-DD")

  if (year_month_day_of_date === year_month_day_of_today) {
    return {
      style: {
        backgroundColor: "lightblue",
      },
    }
  }

  if (date.getDay() === 0 || date.getDay() === 6) {
    // Sunday or Saturday
    return {
      style: {
        backgroundColor: "whitesmoke",
      },
    }
  }

  const dateString = moment(date).format("YYYY-MM-DD")
  if (holidayDates.includes(dateString)) {
    return {
      style: {
        backgroundColor: "red", // ここで好きなスタイルを適用
        color: "white",
      },
    }
  }
  return {}
}

const Home: BlitzPage = () => {
  return (
    <Layout title="Home">
      <Calendar
        localizer={localizer}
        min={moment().year() - 1}
        max={new Date(2017, 10, 0, 22, 0, 0)}
        views={["month"]}
        dayPropGetter={customDayPropGetter}
        formats={formats}
        style={{ height: 500 }}
        startAccessor=" start "
        endAccessor=" end "
      />
      <div></div>
    </Layout>
  )
}

export default Home
