import React from 'react';
// OTHER LIBRARIES
import cn from 'classnames';
// REACT HOOK FORM
import {
  useForm, useFieldArray,
} from 'react-hook-form';
// MATERIAL UI
import { Button } from '@mui/material';
// REACT ROUTER DOM
import { useHistory, Redirect, useParams } from 'react-router-dom';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import { fetchCreateArticle } from '../../redux/asyncAction';
// CUSTOM COMPONENTS
import { ArticleContainer } from '../article-container/article-container';

import BlogService from '../../services/blog-service';
import classes from './new-article.module.scss';

const NewArticle = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const counter = useSelector(state => state);
  const user = useSelector(state => state.user);
  const isLoggedIn = useSelector(state => state.isLoggedIn);
  const params = useParams();
  console.log(params.slug);
  const blogService = new BlogService();

  let defaultArticle = { objArticle: [{}] };

  if (params.slug) {
    console.log('if');
    const [needArticle] = counter.arrArticles.filter(item => item.slug === params.slug);
    console.log(needArticle);
    defaultArticle = {
      obj: {
        title: needArticle.title,
        description: needArticle.description,
        body: needArticle.body,
      },
      objArticle: needArticle.tagList,
    };
  }

  const { register, control, handleSubmit } = useForm({
    defaultValues: defaultArticle,
  });
  const {
    fields,
    append,
    remove,
  } = useFieldArray({
    control,
    name: 'objArticle',
  });


  const onSubmit = (data) => {
    console.log(data);
    console.log(data.objArticle);
    const taglist = data.objArticle.reduce((start, item) => {
      start.push(item.firstName);
      return start;
    }, []);
    console.log(taglist);
    // eslint-disable-next-line no-param-reassign
    data = Object.assign(data.obj, { tagList: taglist });
    console.log(data);
    if (params.slug) {
      blogService.fetchDeleteArticle(params.slug, user.token).then(() => {
        console.log('deleteArticle');
        dispatch(fetchCreateArticle(data, counter, history));
      });
    } else dispatch(fetchCreateArticle(data, counter, history));
  };

  if (isLoggedIn) {
    return (
      <ArticleContainer>
        <h1 className={classes.titleNewArticle}>Create new article</h1>
        <form className={classes.formBlog} onSubmit={handleSubmit(onSubmit)}>

          <label htmlFor="title">
            Title
            <input
              id="title"
              type="text"
              placeholder="Title"
              {...register('obj.title', { required: true })}
            />
          </label>
          <label htmlFor="description">
            Short description
            <input
              id="description"
              type="text"
              placeholder="Title"
              {...register('obj.description', { required: true })}
            />
          </label>
          <label htmlFor="textarea">
            Text
            <textarea
              id="textarea"
              type="text"
              placeholder="Text"
              {...register('obj.body', { required: true })}
            />
          </label>
          {/* eslint-disable-next-line jsx-a11y/label-has-for */}
          <label htmlFor="tag">
            Tags
            <ul>
              {fields.map((item, index) => (
                <li key={item.id}>
                  {console.log(item)}
                  {console.log(fields)}
                  <input id="tag" defaultValue={Object.keys(defaultArticle).length === 1 ? '' : defaultArticle.objArticle[index]} placeholder="Tag" className={classes.inputTags} {...register(`objArticle.${index}.firstName`)} />
                  {index > 0
                    ? (
                      <Button
                        className={cn(classes.button, classes.buttonDel)}
                        type="button"
                        name={index}
                        onClick={() => {
                          console.log(index);
                          remove(index);
                        }}
                      >
                        Delete
                      </Button>
                    ) : null}
                  <div className={classes.emptyDiv} />
                </li>
              ))}
              <Button
                className={cn(classes.button, classes.buttonAdd)}
                type="button"
                onClick={() => {
                  append({});
                }}
              >
                Add tag
              </Button>
            </ul>
          </label>
          <input className={classes.submitButton} value="Save" type="submit" />
        </form>
      </ArticleContainer>
    );
  }
  return <Redirect to="/articles" />;
};

export default NewArticle;
