/*
 * Page Component For react-reveal
 *
 * Copyright © Roman Nosov 2017
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
//import { string, bool } from 'prop-types';
//import Fade from 'react-reveal/Fade';
import Helmet from 'react-helmet';

//const
//  propTypes = {
//    title: string.isRequired,
//    scroll: bool,
//    animate: bool,
//  },
//  defaultProps = {
//  	//code: true,
//    //	title: 'Untitled',
//  };



class Page extends React.Component {
  

	componentDidMount() {
    if (this.props.scroll) //&& window.pageYOffset > 100)
    	Page.scroll();    
	}

  static event(title) {
    Page.clicky('#' + document.location.pathname, title);
  }

  static clicky(href, title, type) {
    if (window.clicky)
      window.clicky.log(href, title, type);
  }

  static smoothScroll() {
      var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
      if (currentScroll > 0) {
        window.requestAnimationFrame(Page.smoothScroll);
        window.scrollTo (0,currentScroll - (currentScroll/5));
      }
  }

  static scroll() {
    if ('requestAnimationFrame' in window)
      Page.smoothScroll();
    else
      window.scrollTo (0, 0);
  }

  render() {
			//<Fade disabled={!this.props.animate} force>
	  	//</Fade>
    const { className, title, children, style } = this.props;
    return (
        <div className={className} style={style}>
          <Helmet title={title} />
          {children}
        </div>
		);
	}

}

export default Page;
