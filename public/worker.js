function calculateOptimality(ticket, maxData) {
    const { maxPrice, maxDuration, maxStops } = maxData
    const priceOptimality = 1 / (1 + ticket.price / maxPrice)
    const durationOptimality =
        1 /
        (1 +
            ticket.segments.reduce(
                (total, segment) => total + segment.duration,
                0
            ) /
                maxDuration)
    const stopsCount = ticket.segments.reduce(
        (total, segment) => total + segment.stops.length,
        0
    )
    const stopsOptimality = 1 / (1 + stopsCount / maxStops)
    const totalOptimality =
        priceOptimality * durationOptimality * stopsOptimality

    return totalOptimality
}
function calculateLowestDuration(ticket) {
    return Math.min(...ticket.segments.map((flight) => flight.duration))
}
function calculateMaxStops(ticket) {
    return Math.max(...ticket.segments.map((segment) => segment.stops.length))
}

function performAPICall(apiUrl) {
    return new Promise((resolve, reject) => {
        fetch(apiUrl)
            .then((response) => {
                if (response.ok) {
                    response.json().then((data) => {
                        let tickets = data.tickets

                        const maxData = tickets.reduce(
                            (acc, ticket) => {
                                const ticketMaxPrice = ticket.price
                                const ticketMaxDuration = Math.max(
                                    ...ticket.segments.map(
                                        (segment) => segment.duration
                                    )
                                )
                                const ticketMaxStops = Math.max(
                                    ...ticket.segments.map(
                                        (segment) => segment.stops.length
                                    )
                                )

                                // Update the maximum values
                                acc.maxPrice = Math.max(
                                    acc.maxPrice,
                                    ticketMaxPrice
                                )
                                acc.maxDuration = Math.max(
                                    acc.maxDuration,
                                    ticketMaxDuration
                                )
                                acc.maxStops = Math.max(
                                    acc.maxStops,
                                    ticketMaxStops
                                )

                                return acc
                            },
                            {
                                maxPrice: Number.NEGATIVE_INFINITY,
                                maxDuration: Number.NEGATIVE_INFINITY,
                                maxStops: Number.NEGATIVE_INFINITY
                            }
                        )

                        tickets = tickets.map((ticket) => ({
                            ...ticket,
                            lowestDuration: calculateLowestDuration(ticket),
                            optimality: calculateOptimality(ticket, maxData),
                            maxStops: calculateMaxStops(ticket)
                        }))

                        resolve({
                            tickets,
                            stop: data.stop
                        })
                    })
                } else {
                    reject('API call failed with status: ' + response.status)
                }
            })
            .catch((error) => {
                reject(error)
            })
    })
}

self.onmessage = function (event) {
    const requestData = event.data

    performAPICall(requestData)
        .then((responseData) => {
            self.postMessage(responseData)
        })
        .catch((error) => {
            console.error('Error:', error)
            self.postMessage({ error })
        })
}
