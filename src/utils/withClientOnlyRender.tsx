import React from 'react'

const withClientOnlyRender = <P extends object>(
  Component: React.ComponentType<P>
) =>
  class WithClientOnlyRender extends React.Component<
    P,
    { hasMounted: boolean }
  > {
    constructor(props: P) {
      super(props)
      this.state = { hasMounted: false }
    }

    componentDidMount() {
      this.setState(() => ({ hasMounted: true }))
    }

    render() {
      if (!this.state.hasMounted) {
        return null
      }

      return <Component {...this.props} />
    }
  }

export default withClientOnlyRender
