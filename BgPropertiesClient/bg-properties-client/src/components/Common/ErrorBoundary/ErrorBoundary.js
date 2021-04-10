import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
    };
  }

  componentDidCatch(error, errorInfo) {
    console.log("error boundary:", error);
    console.log("errorInfo:", errorInfo);

  }

  render() {
    if (this.state.hasError) {
      return <span>Something went wrong</span>
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
