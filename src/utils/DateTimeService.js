export class DateTimeService {
    static SECONDS_IN_MINUTE = 60
    static MINUTES_IN_HOUR = 60
    static HOURS_IN_DAY = 24
    static MS_IN_SECOND = 1000
    static MS_IN_MINUTE = this.SECONDS_IN_MINUTE * this.MS_IN_SECOND
    static MS_IN_HOUR = this.MINUTES_IN_HOUR * this.MS_IN_MINUTE
    static MS_IN_DAY = this.HOURS_IN_DAY * this.MS_IN_HOUR
    static SECONDS_IN_HOUR = this.MINUTES_IN_HOUR * this.SECONDS_IN_MINUTE
    static SECONDS_IN_DAY = this.HOURS_IN_DAY * this.SECONDS_IN_HOUR
    static DAYS_IN_WEEK = 7

    static TIME_UNITS = {
        SECOND: 'second',
        MINUTE: 'minute',
        HOUR: 'hour',
        DAY: 'day',
    }

    static TEXTS = {
        JUST_NOW: 'Just now',
        LESS_THAN_A_MINUTE: 'Less than a minute ago',
    }

    static formatElapsedTime(value, unit) {
        return `${value} ${unit}${value > 1 ? 's' : ''} ago`
    }

    static floorDivide(value, divisor) {
        return Math.floor(value / divisor)
    }

    static getElapsedTime(startDate, endDate = new Date()) {
        const elapsedMilliseconds = endDate - startDate
        const elapsedSeconds = this.floorDivide(
            elapsedMilliseconds,
            this.MS_IN_SECOND
        )

        if (elapsedSeconds < this.SECONDS_IN_MINUTE / 6)
            return this.TEXTS.JUST_NOW
        if (elapsedSeconds < this.SECONDS_IN_MINUTE)
            return this.TEXTS.LESS_THAN_A_MINUTE

        const timeFrames = [
            {
                threshold: this.SECONDS_IN_HOUR,
                value: this.floorDivide(elapsedSeconds, this.SECONDS_IN_MINUTE),
                unit: this.TIME_UNITS.MINUTE,
            },
            {
                threshold: this.SECONDS_IN_DAY,
                value: this.floorDivide(elapsedSeconds, this.SECONDS_IN_HOUR),
                unit: this.TIME_UNITS.HOUR,
            },
            {
                threshold: this.SECONDS_IN_DAY * this.DAYS_IN_WEEK,
                value: this.floorDivide(elapsedSeconds, this.SECONDS_IN_DAY),
                unit: this.TIME_UNITS.DAY,
            },
        ]

        for (let i = 0; i < timeFrames.length; i++) {
            const result = this.checkThreshold(
                elapsedSeconds,
                timeFrames[i].threshold,
                timeFrames[i].value,
                timeFrames[i].unit
            )
            if (result) return result
        }

        return startDate.toLocaleDateString()
    }

    static checkThreshold(
        elapsedSeconds,
        threshold,
        elapsedValue,
        unit,
        fallback = null
    ) {
        if (elapsedSeconds < threshold) {
            return this.formatElapsedTime(elapsedValue, unit)
        }
        return fallback
    }
}
