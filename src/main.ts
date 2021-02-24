import createApp from './app'

const start = async (port: number) => {
  const server = createApp({
    logger: {
      level: 'info',
      prettyPrint: true,
    },
  })
  try {
    await server.listen(port, '0.0.0.0')
    const address = server.server.address()
    server.log.debug(`Listening at ${address}`)
  } catch (err) {
    server.log.error(err)
    throw err
  }
}

start(3000)
