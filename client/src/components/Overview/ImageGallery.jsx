import React from 'react';
import PropTypes from 'prop-types';
import Thumbnails from './Thumbnails.jsx';
import DefaultView from './DefaultView.jsx';
import ExpandedView from './ExpandedView.jsx';

class ImageGallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedThumbnail: 0,
      isExpanded: false,
      zoomExpanded: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.openExpand = this.openExpand.bind(this);
    this.closeExpand = this.closeExpand.bind(this);
    this.zoomExpand = this.zoomExpand.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { selectedStyle } = this.props;
    if (prevProps.selectedStyle.style_id !== selectedStyle.style_id) {
      this.closeExpand();
    }
  }

  handleClick(event) {
    let { selectedThumbnail } = this.state;
    if (selectedThumbnail !== Number(event.target.id)) {
      selectedThumbnail = Number(event.target.id);
      return this.setState({ selectedThumbnail, isExpanded: false });
    }
    return undefined;
  }

  openExpand() {
    const { isExpanded } = this.state;
    if (!isExpanded) {
      this.setState({ isExpanded: true });
    }
  }

  closeExpand() {
    this.setState({ isExpanded: false });
  }

  zoomExpand() {
    const { zoomExpanded } = this.state;
    if (zoomExpanded) {
      console.log('zoom out');
      this.setState({ zoomExpanded: false });
    }
    if (!zoomExpanded) {
      console.log('zoom in');
      this.setState({ zoomExpanded: true });
    }


  }

  render() {
    const { selectedStyle } = this.props;
    const { selectedThumbnail, isExpanded } = this.state;
    let viewExpanded = <></>;
    if (isExpanded) {
      viewExpanded = (
        <ExpandedView
          selectedStyle={selectedStyle}
          selectedThumbnail={selectedThumbnail}
          openExpand={this.zoomExpand}
        />
      );
    }
    return (
      <>
        <Thumbnails
          selectedStyle={selectedStyle}
          selectedThumbnail={selectedThumbnail}
          handleClick={this.handleClick}
        />
        <DefaultView
          selectedStyle={selectedStyle}
          selectedThumbnail={selectedThumbnail}
          openExpand={this.openExpand}
        />
        {viewExpanded}
      </>
    );
  }
}

ImageGallery.defaultProps = {
  selectedStyle: {},
};

ImageGallery.propTypes = {
  selectedStyle: PropTypes.oneOfType([PropTypes.object]),
};

export default ImageGallery;
