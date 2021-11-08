import React from 'react';
// import classes from '../form/form.module.scss';
import {
  useForm, useFieldArray,
} from 'react-hook-form';
import { Button } from '@mui/material';
import cn from 'classnames';
// import { useHistory } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
import { ArticleContainer } from '../article-container/article-container';
import classes from './new-article.module.scss';
// import { fetchCreateArticle } from '../../redux/asyncAction';


const NewArticle = () => {
  // const dispatch = useDispatch();
  // const history = useHistory();
  // const token = useSelector(state => state.user.token);

  const { register, control, handleSubmit } = useForm({
    defaultValues: {
      test: [{ tag: '' }],
    },
  });
  const {
    fields,
    remove,
    append,
    push,
  } = useFieldArray({
    control,
    name: 'test',
  });


  const onSubmit = (data) => {
    console.log(data.test);
    console.log(data.test.title);
    const a = push({ tag: '' });
    console.log(a);
    // dispatch(fetchCreateArticle(data, token, history));
  };

  return (
    <ArticleContainer>
      <h1 className={classes.titleNewArticle}>Create new article</h1>
      <form className={classes.formBlog} onSubmit={handleSubmit(onSubmit)}>
        {/* eslint-disable-next-line jsx-a11y/label-has-for */}
        <label>
          Title
          <input
            // className={cn(errors?.['Email address'] && classes.error)}
            type="text"
            placeholder="Title"
            {...register('test.title')}
          />
        </label>
        {/* eslint-disable-next-line jsx-a11y/label-has-for */}
        <label>
          Short description
          <input
            // className={cn(errors?.Password && classes.error)}
            type="text"
            placeholder="Title"
            {...register('test.description')}
          />
        </label>
        {/* eslint-disable-next-line jsx-a11y/label-has-for */}
        <label>
          Text
          <textarea
            type="text"
            placeholder="Text"
            {...register('test.body')}
          />
        </label>
        {/* eslint-disable-next-line jsx-a11y/label-has-for */}
        <label>
          Tags
          <ul>
            {fields.map((item, index) => (
              <li key={item.id}>
                <input placeholder="Tag" className={classes.inputTags} {...register(`scores[${index}]`)} />

                {/* <Controller */}
                {/*  render={({ field }) => <input {...field} />} */}
                {/*  name={`test.${index}.lastName`} */}
                {/*  control={control} */}
                {/* /> */}
                <Button
                  className={cn(classes.button, classes.buttonDel)}
                  type="button"
                  onClick={() => remove(index)}
                >
                  Delete
                </Button>
              </li>
            ))}
            <Button
              className={cn(classes.button, classes.buttonAdd)}
              type="button"
              onClick={() => {
                append({ tag: '' });
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
};

export default NewArticle;
