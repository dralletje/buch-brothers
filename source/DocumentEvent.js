/*
Simple component that will not render anything.
On mount it will bind to a document event, and it will clean up on unmount
<DocumentEvent
  name="scroll"
  handler={updateScrollPosition}
/>
@flow
*/

import React from 'react';

class DocumentEvent extends React.Component {
  unbind: () => void;
  props: {
    handler: (e: any) => void,
    name: string,
    passive?: boolean,
  }

  componentDidMount() {
    let fn = (e) => {
      if (!this.props.passive)
        e.preventDefault();
      this.props.handler(e);
    }
    document.addEventListener(this.props.name, fn);
    this.unbind = () => {
      document.removeEventListener(this.props.name, fn);
    }
  }

  componentWillUnmount() {
    this.unbind();
  }

  render() {
    return null;
  }
}

export default DocumentEvent;
