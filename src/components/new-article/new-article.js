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
import { useParams, useHistory } from 'react-router-dom';
// REDUX
import { useSelector, useDispatch } from 'react-redux';
import { asyncEditArticle } from '../../redux/asyncAction';
// CUSTOM COMPONENTS
import { ArticleContainer } from '../article-container/article-container';

import classes from './new-article.module.scss';


const NewArticle = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const counter = useSelector(state => state);
  const params = useParams();

  let defaultArticle = { objArticle: [] };

  const objSlugLocalStorage = localStorage.getItem('defaultArticle');
  if (objSlugLocalStorage && params.slug) {
    defaultArticle = JSON.parse(objSlugLocalStorage);
  }

  if (params.slug && counter.arrArticles.length > 1) {
    const [needArticle] = counter.arrArticles.filter(item => item.slug === params.slug);
    if (!needArticle) {
      history.replace('/articles');
    }
    defaultArticle = {
      obj: {
        title: needArticle?.title,
        description: needArticle?.description,
        body: needArticle?.body,
      },
      objArticle: needArticle?.tagList,
    };
    localStorage.setItem('defaultArticle', JSON.stringify(defaultArticle));
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
    const taglist = data.objArticle.reduce((start, item) => {
      start.push(item.firstName);
      return start;
    }, []);
    const newData = Object.assign(data.obj, { tagList: taglist });
    dispatch(asyncEditArticle(newData, counter, params?.slug));
  };

  return (
    <>
      {counter.arrArticles.length > 1
        ? (
          <ArticleContainer>
            <h1 className={classes.titleNewArticle}>{params.slug ? 'Edit article' : 'Create new article'}</h1>
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
                        defaultValue={Object.keys(defaultArticle).length === 1 ? '' : defaultArticle?.objArticle[index]}
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
