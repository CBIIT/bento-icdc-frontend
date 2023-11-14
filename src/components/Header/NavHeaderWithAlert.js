import React, {
  useEffect,
  useRef,
  useState,
} from 'react';
import { withStyles } from '@material-ui/styles';
import axios from 'axios';
import HeaderView from './HeaderView';
import NavBarContainer from '../NavBar/NavBarContainer';

const useMutationObserver = (
  ref,
  callback,
  options = {
    attributes: true,
    characterData: true,
    childList: true,
    subtree: true,
  },
) => {
  useEffect(() => {
    if (ref.current) {
      const observer = new MutationObserver(callback);
      observer.observe(ref.current, options);
      return () => observer.disconnect();
    }
    return ref;
  }, [callback, options]);
};

const HeaderWithGovAlert = ({
  classes,
}) => {
  const parentRef = useRef();
  const [alertBannerHeight, setHeight] = useState(0);
  const interceptor = async () => {
    axios.interceptors.response.use(
      (res) => {
        setHeight(parentRef?.current?.offsetHeight);
        return res;
      },
      (err) => {
        throw new Error(err.response.data.message);
      },
    );
  };

  const urlLink = 'https://cbiit.github.io/nci-softwaresolutions-elements/banners/government-shutdown.html';

  useEffect(() => {
    interceptor();
  }, []);

  const AlertPlaceholder = (url) => {
    const [link, setLink] = useState(url);
    useEffect(() => {
      setLink(url);
    }, []);
    return (
      <include-html src={link}>
        <p className={classes.placeholder} />
      </include-html>
    );
  };

  // this method is used for only testing purpose only.
  // will remove this method after testing
  const detectMutation = async () => {
    interceptor();
    setTimeout(() => {
      setHeight(parentRef?.current?.offsetHeight);
      const statsEl = document.querySelector('.stats-bar')?.querySelectorAll('div')[0];
      const adjHeight = parentRef?.current?.offsetHeight;
      statsEl.style.marginTop = `${adjHeight}px`;
    }, 100);
  };

  useMutationObserver(parentRef, detectMutation);
  return (
    <div>
      <div id="govAlertMsg" ref={parentRef}>
        <p className={classes.placeholder} />
        {AlertPlaceholder(urlLink)}
      </div>
      {(parentRef.current && parentRef.current.offsetHeight)
        && <HeaderView offsetHeight={alertBannerHeight} />}
      {(parentRef.current && parentRef.current.offsetHeight)
        && <NavBarContainer offsetHeight={alertBannerHeight} />}
    </div>
  );
};

const styles = () => ({
  placeholder: {
    height: '1px',
  },
});

export default withStyles(styles)(HeaderWithGovAlert);
