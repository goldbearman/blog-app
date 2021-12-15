import React from 'react';
// OTHER LIBRARIES
import cn from 'classnames';
// REACT HOOK FORM
import {
  useForm, useFieldArray,
} from 'react-hook-form';
// MATERIAL UI
import { Button, CircularProgress } from '@mui/material';
// REACT ROUTER DOM
import { useParams } from 'react-router-dom';
// REDUX
import { useSelector, useDispatch } from 'react-redux';
import { asyncEditArticle } from '../../redux/asyncAction';
// CUSTOM COMPONENTS
import { ArticleContainer } from '../article-container/article-container';

import classes from './new-article.module.scss';

const NewArticle = () => {
  const dispatch = useDispatch();
  const counter = useSelector(state => state);
  const params = useParams();

  let defaultArticle = { objArticle: [{}] };

  // eslint-disable-next-line no-console
  console.log('getArticleSlug');

  // eslint-disable-next-line no-console
  console.log(counter);
  if (params.slug && counter.arrArticles.length > 1) {
    const [needArticle] = counter.arrArticles.filter(item => item.slug === params.slug);
    defaultArticle = {
      obj: {
        title: needArticle.title,
        description: needArticle.description,
        body: needArticle.body,
      },
      objArticle: needArticle.tagList,
    };
    localStorage.setItem('defaultArticle', JSON.stringify(defaultArticle));
    // eslint-disable-next-line no-console
    console.log(defaultArticle);
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
    // eslint-disable-next-line no-console
    console.log('onSubmit');
    const taglist = data.objArticle.reduce((start, item) => {
      start.push(item.firstName);
      return start;
    }, []);
    const newData = Object.assign(data.obj, { tagList: taglist });
    dispatch(asyncEditArticle(newData, counter, params?.slug));
  };


  // eslint-disable-next-line no-console
  console.log(defaultArticle);
  // eslint-disable-next-line no-console
  console.log(counter.isLoggedIn);
  // eslint-disable-next-line no-console
  console.log(params.slug);
  return (
    <>
      {counter.arrArticles.length > 1
        ? (
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
                      <input
                        id="tag"
                        defaultValue={Object.keys(defaultArticle).length === 1 ? '' : defaultArticle.objArticle[index]}
                        placeholder="Tag"
                        className={classes.inputTags}
                        {...register(`objArticle.${index}.firstName`)}
                      />
                      <Button
                        className={cn(classes.button, classes.buttonDel)}
                        type="button"
                        name={index}
                        onClick={() => {
                          remove(index);
                        }}
                      >
                        Delete
                      </Button>

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
        )
        : <div className={classes.progressContainer}><CircularProgress /></div>
      }
    </>
  );
};

export default NewArticle;
